import Image from 'next/image'
import styles from './styles.module.css'
import { FiX, FiEdit } from 'react-icons/fi'
import { PropsProduct } from '../../contract'

const ProductItem: React.FC<PropsProduct> = (props) => {
  return (
    <div className={styles.container}>
      <section className={styles.imageContainer}>
        <Image src={props.photo} objectFit="cover" width={150} height={150} />
      </section>
      <section className={styles.description}>
        <div className={styles.info}>
          <strong>
            {props.name}
            <br />
            <small>ID: {props.id}</small>
          </strong>
          <p>{props.description}</p>
          <span>
            {new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(props.cost)}
          </span>
        </div>
        <div className={styles.containerButtons}>
          <button className={styles.editItem}>
            <FiEdit />
          </button>
          <button className={styles.removeItem}>
            <FiX />
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductItem
