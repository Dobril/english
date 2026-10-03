import { content } from '../content'
import { useLang } from './useLang'

export function useContent() {
  return content[useLang()]
}
