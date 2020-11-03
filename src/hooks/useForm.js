import { useState } from 'react'

function useForm(valoresIniciais) { // custom hook
    const [values, setValues] = useState(valoresIniciais); 

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor, // nome: 'valor'
        })
    }

    function handleChange(e) {
        setValue(e.target.getAttribute('name'), e.target.value)}

    function clearForm() {
        setValues(valoresIniciais)
    }

    return {
        values,
        handleChange,
        clearForm,
    }
}

export default useForm