import { signIn } from "@/auth"
import {handleSignIn} from "@/lib/action"
 
export default function SignIn() {

  return (
    <form  >
      <button onClick={()=>handleSignIn()}>Google</button>
    </form>
  )
} 