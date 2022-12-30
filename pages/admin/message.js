import MessageItem from 'components/admin/MessageItem'
import Layout from 'components/Layout'

const Page = ({ message }) => {
  return (
    <Layout>
        <section className={`flex flex-col gap-[20px] max-w-[600px]`}>
            {
                message.map(( (e, i) => (
                    <MessageItem data={ e } key={ i }/>
                )))
            }
        </section>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

    const _Message = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/message' )
    const Message = await _Message.json()
  
    return {
      props: {
        message: Message
      }
    }
  }

export default Page