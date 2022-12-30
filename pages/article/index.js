import Layout from 'components/Layout'
import Link from 'next/link'
import ArticleCard from 'components/main/ArticleCard'
import { useState } from 'react'
import excuteQuery from 'utils/DataBaseConnection'
import moment from 'moment'
import toCapitalize from 'utils/Capitalize'
import ArticlePagination from 'components/main/ArticlePagination'
import { useRouter } from 'next/router'
import TranslateLocal from 'utils/TranslateLocal'
import { Icon } from '@iconify/react'
import articleLinkGenerate from 'utils/articleLinkGenerate'

const Page = ({ DATA }) => {

	const Router = useRouter()

	const [ListData, setListData] = useState(DATA)
	const [PageNum, setPageNum] = useState(0)
	const [MobileDisplay, setMobileDisplay] = useState('grid')

	const fHandle = {
		toggleDisplayMobile: () => setMobileDisplay(MobileDisplay == 'grid' ? 'list' : 'grid')
	}

	return (
		<Layout title="Artikel">

			<section className={`max-w-screen-2xl mx-auto px-[20px] md:px-[30px] my-[30px]`}>

				{/* TITLE + TOGGLE DISPLAY */}
				<div className={`flex md:justify-center justify-between my-[30px]`}>
					<h2 className={`text-[1.5rem] w-fit text-center text-MO1`}>{TranslateLocal('Semua Artikel', 'All Article', Router)}</h2>
					<button className={`p-[5px] border border-MO6 sm:hidden`} onClick={() => fHandle.toggleDisplayMobile()}>
						<Icon className="text-[24px] text-MO6" icon={MobileDisplay == 'grid' ? 'ic:sharp-grid-view' : 'ic:round-view-list'} />
					</button>
				</div>

				{/* ARTICLE LIST */}
				<div className={`grid ${MobileDisplay == 'grid' ? 'grid-cols-2' : 'grid-cols-1'} sm:grid-cols-3 md:grid-cols-4 gap-[20px]`}>
					{
						ListData.map((e, i) => (
							<ArticleCard data={e} key={i} verticalMode={MobileDisplay == 'grid'} />
						))
					}
				</div>

			</section>

			{/* PAGINATION */}
			<ArticlePagination length={20} selected={PageNum} editHandle={setPageNum} />

		</Layout>
	)

}

export const getServerSideProps = async (ctx) => {

	let result = []

	try {

		const _query = await excuteQuery({
			query: `SELECT * FROM article`
		})

		result = _query.map(e => e && {
			...e,
			title: toCapitalize(e.title),
			created_at: moment(e.created_at).format('YYYY-MM-DD'),
			redirect: `/article/${articleLinkGenerate(e.id, e.title)}`
		})

	} catch (err) {

		console.error(err)

	}

	return {
		props: {
			DATA: result
		}
	}
}

export default Page