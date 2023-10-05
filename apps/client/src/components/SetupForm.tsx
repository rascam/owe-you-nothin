
interface ComponentProps {
  name: string
  age: number
}


export default function SetupForm({name, age}: ComponentProps) {

  return (
    <div>
    <p>{name}{age}</p>
    </div>
  )
}