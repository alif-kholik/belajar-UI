import Layout from 'components/Layout'
import ContactInformation from 'components/main/ContactInformation'
import ContactSendMessage from 'components/main/ContactSendMessage'

const Page = () => {
  return (
    <Layout title="Kontak Kami">
      <section className={`flex flex-col md:flex-row [&>*]:w-full max-w-screen-xl md:m-[30px_auto_50px] [&>div]:shrink`}>
        <ContactInformation/>
        <ContactSendMessage/>
      </section>
    </Layout>
  )
}

export default Page