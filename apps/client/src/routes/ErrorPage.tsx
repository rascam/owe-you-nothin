// import Navigation from "@/components/Navigation"

import NavigationDisabled from "@/components/NavigationDisabled"


function ErrorPage() {

  return (
      <div className="app">
        <NavigationDisabled/>
         <h1 className="mt-14">Error Page</h1>
        <img className="w-8" src="./public/Logo.JPG"></img>
        <h1 className='bg-lime-600'>404: Path not found</h1>
      </div>
  )
}

export default ErrorPage
