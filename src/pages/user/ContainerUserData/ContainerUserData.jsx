import { useState } from 'react'
import { useUser } from '../../../context/User/useUser'
import styles from './ContainerUserData.module.css'

export const ContainerUserData = () => {
    const { user, setUser, deleteAccount } = useUser()
    const [ isEditing, setIsEditing ] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const [ formData, setFormData ] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const baseUrl = import.meta.env.VITE_API_URL || ""
            const res = await fetch(`${baseUrl}/api/sessions/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' 
            })

            if (res.ok) {
                const data = await res.json()
                setUser(data.user)
                setIsEditing(false)
            } 
        } catch (error) {
            console.error("Error al actualizar:", error)
        } finally {
            setIsSaving(false)
        }
    }

    return(
        <div className={styles.containerUserData}>
            <p className={styles.titleUserData}>Mi Perfil</p>

            {isEditing ? (
                <form className={styles.containerData} onSubmit={handleSubmit}>
                    <label className={styles.subtitleData}>Nombre:</label>
                    <input 
                        name="first_name" 
                        value={formData.first_name} 
                        onChange={handleChange} 
                        className={styles.inputData}
                    />

                    <label className={styles.subtitleData}>Apellido:</label>
                    <input 
                        name="last_name" 
                        value={formData.last_name} 
                        onChange={handleChange} 
                        className={styles.inputData}
                    />

                    <label className={styles.subtitleData}>Email:</label>
                    <input 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        className={styles.inputData}
                    />

                    <label className={styles.subtitleData}>Edad:</label>
                    <input 
                        name="age" 
                        type="number"
                        value={formData.age} 
                        onChange={handleChange} 
                        className={styles.inputData}
                    />

                    <div className={styles.containerButtonEdit}>
                        <button type="submit" className={styles.buttonSave}>{isSaving ? "Guardando..." : "Guardar Cambios"}</button>
                        <button 
                            type="button" 
                            className={styles.buttonCancel} 
                            onClick={() => setIsEditing(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
            <div className={styles.containerData}>
                <p className={styles.subtitleData}>Nombre:</p>
                <p>{user.first_name}</p>
                <p className={styles.subtitleData}>Apellido:</p>
                <p>{user.last_name}</p>
                <p className={styles.subtitleData}>Email:</p>
                <p>{user.email}</p>
                <p className={styles.subtitleData}>Edad:</p>
                <p>{user.age}</p>
                <div className={styles.containerButtonData}>
                    <button className={styles.buttonData} onClick={() => setIsEditing(true)}>Modificar</button>
                </div>
                <div className={styles.containerButtonDelete}>
                    <button className={styles.buttonDelete} onClick={deleteAccount}>Eliminar mi cuenta</button>
                </div>
            </div>
            )}
        </div>
    )
}