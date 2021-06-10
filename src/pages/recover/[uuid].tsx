import { GetServerSideProps } from "next"
import styles from '../../styles/Recover.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import api from "../../services/api"

const Recover: React.FC<{ uuid: string }> = ({ uuid }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [lockButton, setLockButton] = useState(false)
    const route = useRouter()


    useEffect(() => {
        verifyUser()
    }, [])

    const verifyUser = async () => {
        const response = await api.get(`/users/verify/${ uuid }`).catch(error => {
            route.replace("/")
            return error
        })
        if (response.status !== 200) {
            route.replace("/")
        }
    }

    async function submitForm(event) {
        event.preventDefault()
        setLockButton(true)

        await api
            .put(`users/recover/${ uuid }`, {
                confirmPassword,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    alert("senha alterada com sucesso!")
                    route.push("/")
                }
            })
            .catch(error => {
                alert(error.response.data.message)
            })
        setLockButton(false)
    }
    return (
        <div className={styles.container}>
            <main className={styles.containerRecover}>

                <form onSubmit={submitForm}>
                    <h3>Recuperar minha senha</h3>
                    <div className={styles.groupByLabelInput}>
                        <label htmlFor="password">Senha</label>
                        <input
                            value={password}
                            required
                            id="password"
                            minLength={4}
                            className={styles.inputStyles}
                            onChange={(text) => setPassword(text.target.value)}
                            type="password"
                        />
                    </div>
                    <div className={styles.groupByLabelInput}>
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input
                            value={confirmPassword}
                            required
                            minLength={4}
                            id="confirmPassword"
                            className={styles.inputStyles}
                            onChange={(text) => setConfirmPassword(text.target.value)}
                            type="password"
                        />
                    </div>
                    <button type="submit" disabled={lockButton} >Entrar</button>
                </form>

            </main>
        </div>
    )
}

export default Recover

export const getServerSideProps: GetServerSideProps = async context => {
    const uuid = context.params.uuid

    return {
        props: {
            uuid
        }
    }
}