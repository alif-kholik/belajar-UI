import { Icon } from '@iconify/react'
import Layout from 'components/Layout'
import ArticleComp from 'components/main/ArticleComp'
import ToTopButton from 'components/main/ToTopButton'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import articleLinkGenerate from 'utils/articleLinkGenerate'
import toCapitalize from 'utils/Capitalize'
import excuteQuery from 'utils/DataBaseConnection'

const DumpArticle = {
	id: 112,
	image: '/article/dump.jpg',
	date: moment(new Date()).format('D MMMM YYYY'),
	title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Dignissi',
	body: [
		{
			type: 'h3',
			text: '1. Blandit volutpat maecenas volutpat blandit aliquam'
		},
		{
			type: 'p',
			text: 'Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Erat nam at lectus urna duis. Ut morbi tincidunt augue interdum. Euismod nisi porta lorem mollis aliquam ut cibus. Ultricies integer quis auctor elit sed vulputate mi sit amet.'
		},
		{
			type: 'p',
			text: 'Egestas maecenas pharetra convallis posuere. Purus sit amet volutpat consequat mauris nunc congue. Amet venenatis urna cursus eget nunc. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Porttitor leo a m donec adipiscing tristique risus nec feugiat in.'
		},
		{
			type: 'h3',
			text: '2. In fermentum et sollicitudin ac'
		},
		{
			type: 'p',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Dignissi'
		},
		{
			type: 'p',
			text: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Odio ut sem nulla pharetra. Vestibulum mattis ullamcorper'
		},
		{
			type: 'h3',
			text: '3. Imperdiet sed euismod nisi porta lorem mollis'
		},
		{
			type: 'p',
			text: 'Egestas maecenas pharetra convallis posuere. Purus sit amet volutpat consequat mauris nunc congue. Amet venenatis urna cursus eget nunc. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Porttitor leo a m donec adipiscing tristique risus nec feugiat in.'
		},
		{
			type: 'p',
			text: 'In fermentum et sollicitudin ac. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Aliquet porttitor lacus luctus accumsan tortor. Et pharetra pharetra massa massa. Urna et pharetra pharetra massa massa. Quisque sagittis purus sit amet. Bibendum est ultrici'
		},
	],
	tag: ['lorem', 'ipsum', 'dolor'],
	recommended: [
		{
			id: 112,
			image: '/article/dump.jpg',
			redirect: '/article/112-lorem-ipsum-dolor-sit-amet,-consectetur-adipiscing-elit',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			date: moment(new Date()).format('DD MMMM YYYY')
		},
		{
			id: 112,
			image: '/article/dump.jpg',
			redirect: '/article/112-lorem-ipsum-dolor-sit-amet,-consectetur-adipiscing-elit',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			date: moment(new Date()).format('DD MMMM YYYY')
		},
		{
			id: 112,
			image: '/article/dump.jpg',
			redirect: '/article/112-lorem-ipsum-dolor-sit-amet,-consectetur-adipiscing-elit',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			date: moment(new Date()).format('DD MMMM YYYY')
		},
	],
	comment: [
		// {
		//   name: 'Sadwueiqwe Wqeuiwqdra',
		//   email: 'asdasdasdra@gmail.com',
		//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Dignissi',
		//   date: moment(new Date()).format('DD MMMM YYYY, HH:mm'),
		//   image: process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/load.php?dir=/testimoni/testimoni220929831487.jpg&width=128&height=128'
		// },
		// {
		//   name: 'Sadwueiqwe Wqeuiwqdra',
		//   email: 'asdasdasndra@gmail.com',
		//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Dignissi',
		//   date: moment(new Date()).format('DD MMMM YYYY, HH:mm')
		// },
		// {
		//   name: 'Sadwueiqwe Wqeuiwqdra',
		//   email: 'asdasdasa@gmail.com',
		//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Dignissi',
		//   date: moment(new Date()).format('DD MMMM YYYY, HH:mm')
		// },
	],
	more: {
		next: {
			id: 112,
			image: '/article/dump.jpg',
			redirect: '/article/112-lorem-ipsum-dolor-sit-amet,-consectetur-adipiscing-elit',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			date: moment(new Date()).format('DD MMMM YYYY')
		},
		previous: {
			id: 112,
			image: '/article/dump.jpg',
			redirect: '/article/112-lorem-ipsum-dolor-sit-amet,-consectetur-adipiscing-elit',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			date: moment(new Date()).format('DD MMMM YYYY')
		}
	}
}

const Page = ({ data }) => {

	const [Data, setData] = useState(data || DumpArticle)

	const Router = useRouter()

	const fHandle = {
		addComment: e => setData({ ...Data, comment: [...Data.comment, e] })
	}

	return data != null ? (
		<Layout title={toCapitalize(Data.title)} description={Data.description} keywords={toCapitalize(Data.tag.join(','))}>

			<Head>
				<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + Router.asPath} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={Data.title} />
				<meta property="og:description" content={Data.description} />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${Data.image}&width=1080&height=364&quality=100`} />
			</Head>

			<ArticleComp
				data={Data}
				handle={{
					addComment: fHandle.addComment
				}}
			/>
		
			<ToTopButton />

		</Layout>
	) : (
		<Layout title="Artikel Tidak Ditemukan">

			<div className={`flex gap-[10px] justify-center items-center text-MO6 bg-white p-[20px] my-[10px]`}>
				<Icon icon="tabler:article-off" className={`text-[1.5rem]`}/>
				<p className={``}>Artikel Tidak Ditemukan</p>
			</div>

		</Layout>
	)
}

export const getServerSideProps = async (ctx) => {

	const ID = ctx.query.id.split('-')[0]
	let result = null

	try {

		const _queryDBMain = await excuteQuery({
			query: `
				SELECT
					article.id,
					article.image,
					article.title,
					article.description,
					article.body,
					article.tag,
					article.created_at,
					comment.id AS comment_id,
					comment.name AS comment_name,
					comment.comment AS comment_text,
					comment.email AS comment_email,
					comment.created_at AS comment_date,
					comment.image AS comment_image
				FROM article LEFT JOIN comment ON article.id = comment.article_id
				WHERE article.id = ${ID}
			`
		})

		result = {
			id: _queryDBMain[0].id,
			image: _queryDBMain[0].image,
			date: moment(_queryDBMain[0].created_at).format('D MMMM YYYY'),
			title: _queryDBMain[0].title,
			description: _queryDBMain[0].description,
			body: JSON.parse(_queryDBMain[0].body),
			tag: _queryDBMain[0].tag.split(','),
			recommended: [],
			comment: _queryDBMain.filter(e => e.comment_id != null ).map( e => e && {
				name: e.comment_name,
				email: e.comment_email,
				text: e.comment_text,
				image: e.comment_image,
				date: moment(e.comment_date).format('DD MMMM YYYY, HH:mm:ss')
			}),
			more: null
		}

		let validationTitle = `${articleLinkGenerate(result.id, result.title)}`

		// console.log(validationTitle, ctx.query.id.toLowerCase())

		if (validationTitle != ctx.query.id.toLowerCase()) throw 'Wrong Query'

	} catch (err) {


		result = null
		console.error(err)

	}

	return {
		props: {
			data: result
		}
	}

}

export default Page