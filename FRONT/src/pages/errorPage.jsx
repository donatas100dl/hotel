import {Link} from "react-router-dom"
function ErrorPage() {;
    return (
        <div className='absolute w-full h-full  z-50'>
            <div className="grid h-full place-content-center bg-background-900 gradiand-bg text-text-100' px-4">
                <div className="text-center">
                <h1 className="text-9xl font-black text-text-100">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-text-400 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-400">We can't find that page.</p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded bg-orange-400 px-5 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring transition-colors"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
