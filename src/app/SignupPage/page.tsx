import './page.css'
export default function SignupPage() {
    return (
        <>
            <div className="loginContainer">
                <form className="loginForm">
                    <h2 className="loginTitle">Signup</h2>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="number" placeholder="Phonenumber" required />
                    <input type="text" placeholder="Address" required />
                    <div className="roleContainer">
                        <label>
                            <input type="radio" name="role" value="User" required /> Student
                        </label>
                        <label>
                            <input type="radio" name="role" value="Admin" /> Admin
                        </label>
                    </div>

                    <button type="submit">Sign Up</button>
                    <p className="signupText">
                        Already have an account? <a href={"/LoginPage"}>Login</a>
                    </p>
                </form>
            </div>

        </>
    )
}