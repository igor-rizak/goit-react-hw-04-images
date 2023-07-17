import { ColorRing } from 'react-loader-spinner'
import css from "./loader.module.css"

export const Loader = () => {
  return (
    <div className={css.loader}>
      <ColorRing />
    </div>
  )
}