import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import useForm from '../../../hooks/useForm'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import videosRepository from '../../../repositories/videos'
import categoriasRepository from '../../../repositories/categorias'

function CadastroVideo() {
    const history = useHistory()
    const [categorias, setCategorias] = useState([])
    const { handleChange, values } = useForm({
        titulo: 'Video padrao',
        url: 'https://www.youtube.com/watch?v=VKmPGmFY7H4',
        categoria: 'Front end',
    })

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {
                setCategorias(categoriasFromServer)
            })
    }, [])

    return (
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={(event) => {
                event.preventDefault()
                //alert('Vídeo cadastrado com sucesso!!!')
                debugger
                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria
                })

                console.log(categoriaEscolhida)

                videosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id,
                })
                    .then(() => {
                        console.log('Cadastrou com sucesso!')
                        history.push('/')
                    })

            }}>
                <FormField
                    label="Título do Vídeo"
                    name="titulo" 
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="URL"
                    name="url" 
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField
                    label="Categoria"
                    name="categoria" 
                    value={values.categoria}
                    onChange={handleChange}
                />

                <Button type="submit">
                    Cadastrar
                </Button> 
            </form>

            <Link to="/cadastro/categoria">
              Cadastrar Categoria 
            </Link>
        </PageDefault>
    )
}

export default CadastroVideo;