import type { CreatePostData } from '../posts';
import { readBoundedJson, HttpError } from './body';
export async function readPostBody(req:Request):Promise<Partial<CreatePostData>> {
  const body = await readBoundedJson(req);
  const fields = ['title','slug','content_mdx','excerpt','description','author','imagem_destaque','meta_title','meta_description','og_image','published_at','scheduled_for'];
  for (const key of fields) if (body[key] !== undefined && typeof body[key] !== 'string') throw new HttpError(400,'Campo editorial inválido.');
  if (body.status !== undefined && !['draft','published','scheduled'].includes(String(body.status))) throw new HttpError(400,'Estado inválido.');
  if (body.tags !== undefined && (!Array.isArray(body.tags) || body.tags.length>100 || body.tags.some(tag=>typeof tag !== 'string' || tag.length>200))) throw new HttpError(400,'Tags inválidas.');
  return body as Partial<CreatePostData>;
}
