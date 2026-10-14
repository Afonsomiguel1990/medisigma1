import http from 'node:http';

// Local diagnostic server. GET/HEAD only, fixed loopback targets, no production use.
const targetPort = Number(process.argv[2]);
const listenPort = Number(process.argv[3]);
if (![3085,3086].includes(targetPort) || ![3090,3091].includes(listenPort)) throw new Error('Unsupported local port');
const instrumentation = `<script>
(() => {
  let value=0, session=0, start=0, last=0, shifts=[];
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      if (entry.startTime-last < 1000 && entry.startTime-start < 5000) session+=entry.value;
      else {session=entry.value;start=entry.startTime;}
      last=entry.startTime;value=Math.max(value,session);
      shifts.push({value:entry.value,time:entry.startTime,sources:entry.sources?.map(s=>s.node?.tagName)});
    }
  }).observe({type:'layout-shift',buffered:true});
  addEventListener('load',()=>setTimeout(()=>{
    const output=document.createElement('output');output.id='local-layout-result';
    output.style='position:fixed;bottom:0;left:0;z-index:99999;max-width:100%;background:#111;color:#fff;font:12px monospace;padding:8px';
    const result={cls:value,viewport:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,shifts};
    output.textContent='Validação local: '+JSON.stringify(result);document.body.append(output);
  },1500));
})();</script>`;
http.createServer(async (request,response)=>{
  if (!['GET','HEAD'].includes(request.method)) {response.writeHead(405);response.end('Read-only diagnostic proxy');return;}
  try {
    const path=request.url || '/';
    if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Invalid path');
    const upstream=await fetch('http://127.0.0.1:'+targetPort+path,{redirect:'manual',headers:{Accept:request.headers.accept||'text/html'}});
    const headers=Object.fromEntries(upstream.headers);
    for (const key of ['content-length','content-encoding','transfer-encoding','content-security-policy']) delete headers[key];
    headers['cache-control']='no-store';
    let body=Buffer.from(await upstream.arrayBuffer());
    if ((headers['content-type']||'').includes('text/html')) body=Buffer.from(body.toString().replace('<head>','<head>'+instrumentation));
    response.writeHead(upstream.status,headers);response.end(request.method==='HEAD'?undefined:body);
  } catch {response.writeHead(502);response.end('Local diagnostic source unavailable');}
}).listen(listenPort,'127.0.0.1',()=>console.log('Read-only layout diagnostic http://localhost:'+listenPort+' -> '+targetPort));
