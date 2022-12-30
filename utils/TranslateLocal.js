import { useRouter } from "next/router"

const TranslateLocal = (id, en, r = useRouter()) => {
    const Router = r
    return Router.locale == 'id' ? id : en
}

export default TranslateLocal