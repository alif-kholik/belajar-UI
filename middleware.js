import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function (req = NextRequest) {

    const kainmoejiCookies = req.cookies.get('kainmoejiCookies')

    if (req.nextUrl.pathname.startsWith('/admin')) {

        //AUTHENTICATION SET
        if (!kainmoejiCookies) {
            const _response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth-set')
    
            const result = await _response.json()

            var response = NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/admin/login')
            response.cookies.set('kainmoejiCookies', result.data.token)
            return response
        }
        //#####END

        //AUTHENTICATION CHECKING
        if (kainmoejiCookies) {

            const responseDecode = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/api/jwtdecode?token=${kainmoejiCookies}&key=${process.env.JWT_KEY}`)

            const resultDecode = await responseDecode.json()

            if (resultDecode.status === 'LoggedIN' && req.nextUrl.pathname.startsWith('/admin/login')) {
                return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/admin')
            }

            if (resultDecode.status === 'LoggedOUT' && !req.nextUrl.pathname.startsWith('/admin/login')) {
                return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/admin/login')
            }

        }
        //#####END

    }


}