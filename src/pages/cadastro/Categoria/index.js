import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

function CadastroCategoria() {
    //const nomeDaCategoria = useState('Filmes');
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const { handleChange, values, clearForm } = useForm(valoresIniciais)

    const [categorias, setCategorias] = useState([])


    //console.log(values)

    useEffect(() => {
        // console.log('alo')
        const URL = 'http://localhost:8080/categorias'
        fetch(URL)
            .then(async (respostaDoServidor) => {
                const resposta = await respostaDoServidor.json()
                setCategorias([
                    ...resposta,
                ])
            })
    },[])

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(e) {
                e.preventDefault();
                //console.log('Você tentou enviar o form né..')
                setCategorias([
                    ...categorias,
                    values
                ])

                clearForm()
            }}> 
                <FormField
                    label="Nome da Categoria"
                    type="text"
                    name="nome" 
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField 
                    label="Descrição:"
                    type="textarea"
                    name="descricao" 
                    value={values.descricao}
                    onChange={handleChange} 
                />

                <FormField
                    label="Cor"
                    type="color"
                    name="cor" 
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                Cadastrar
                </Button>
            </form>

            {categorias.length === 0 && (
                <div>
                    Loading...
                </div>
            )}

            <ul>
                {categorias.map((categoria) => { // console.log(categoria)
                    return (
                        <li key={`${categoria.titulo}`}>
                            {categoria.titulo}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
              Ir para home 
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;

// useState - retorna um array [valor inicial, setState]
// destructuring -> [nome da constante, função que muda o valor] -> valor inicial