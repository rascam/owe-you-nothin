
import CreateGroup from "@/components/CreateGroup";
import NavigationDisabled from "@/components/NavigationDisabled";

function Welcome () {



  return (
    <div className="p-2">
    <NavigationDisabled />
    <div className="mt-40 flex flex-col justify-between items-center">
    <img className= "w-24" src="./Logo.JPG" />
    <h1 className="mt-2 mb-10">Ow' You Nothin'</h1>
    <h3 className="mb-2">Set up your group:</h3>
    <CreateGroup />
    </div>
    </div>
  )
}

export default Welcome