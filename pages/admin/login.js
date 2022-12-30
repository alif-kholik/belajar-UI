import Layout from 'components/Layout'
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const Page = () => {

  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const Router = useRouter()

  const handleLogin = async () => {

    if (Username == '' || Password == '') {
      alert('Masukan Username dan Password !')
      return
    }

    const sendLogin = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: Username,
        password: Password
      })
    })

    const _sendLogin = await sendLogin.json()

    _sendLogin ? Router.push('/admin') : alert('Gagal')

  }

  return (
    <Layout emptylayout>
      <div className={`fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] max-w-full shadow-xl bg-MO3 flex flex-col gap-[20px] p-[30px_20px] rounded-xl`}>
        <h1 className={`text-center font-light uppercase text-xl`}>Login Admin</h1>
        <input className={`bg-MO2/40 p-[10px] rounded-md placeholder:font-light text-center`} type='text' placeholder='Username' value={ Username } onChange={ e => setUsername(e.target.value)  } />
        <input className={`bg-MO2/40 p-[10px] rounded-md placeholder:font-light text-center`} type='password' placeholder='Password' value={ Password } onChange={ e => setPassword(e.target.value) } />
        <button className={`bg-MO1 text-MO3 hover:bg-MO2 hover:text-MO1 transition-colors font-semibold p-[10px] uppercase rounded-md`} onClick={ handleLogin }>
          Login
        </button>
      </div>
    </Layout>
  )
}

export default Page