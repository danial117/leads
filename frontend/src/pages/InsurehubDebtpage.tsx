import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useSigninMutation } from '../hooks/userHook'

export default function InsurehubDebtPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showMore, setShowMore] = useState(false);
  
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSigninMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await signin({
        email,
        password,
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect)
  //   }
  // }, [navigate, redirect, userInfo])

  return (
    <Container className="small-container">
      <Helmet>
        <title> Insurehub Debt Settlement </title>
      </Helmet>
      <h1 className="my-3"> Insurehub Debt Settlement </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
       
        
        <div className="holycow">
          <label>
            <input type="checkbox" name="TCPA" value="1" aria-invalid="false" />
            <span className={`wpcf769-list-item-label ${showMore ? 'expanded' : 'collapsed'}`}>
              By Checking this box, you represent that you are 18+ years of age and agree to the 
              <a href="https://lifeasehealth.com/privacy-policy/"> Privacy Policy </a> and 
              <a href="https://lifeasehealth.com/terms-and-conditions/"> Terms &amp; Conditions</a>. 
              By selecting the above check box "you agree by your electronic signature that you give 
              express written consent to receive marketing communications regarding Insurance and 
              services by automatic dialing system and pre-recorded calls and artificial voice messages 
              from lifeasehealth.com and one or more of its 
              <a href="https://lifeasehealth.com/marketing-partners/"> marketing partners </a> at the 
              phone number and e-mail address provided by you, including wireless numbers, if applicable, 
              even if you have previously registered the provided number on the Do Not Call Registry. 
              SMS/MMS and data messaging rates may apply.” Your consent is not required to get a quote or 
              purchase. Your consent can be revoked at any time for any reason. To receive quotes without 
              providing consent, please call at (TTY 711) (888) 431-1104. Carrier data rates may apply. 
              TCPA LeadID's are used with the information for compliance. This is a solicitation&nbsp;for&nbsp;insurance.
            </span>
          </label>
          <div>
            <button type="button" className="see-more-button" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'See More'}
            </button>
          </div>
        </div>


        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Get Your Medicare Quote
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        {/* <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect={redirect}`}>Create your account</Link>
        </div> */}
      </Form>

      <style>
        {`
          .wpcf7-list-item-label {
            display: block;
            overflow: hidden;
            transition: max-height 0.5s ease;
          }
          .wpcf769-list-item-label {
            flex: 1;
            display: block;
            overflow: hidden;
            transition: max-height 0.5s ease;
          }
          .collapsed {
            max-height: 1.5em; /* Adjust to fit only one line */
          }

          .expanded {
            max-height: 1000px; /* Large value to show entire content */
          }  
          .holycow {
     margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          
          .see-more-button {
            background: none;
            border: none;
            color: blue;
            cursor: pointer;
            text-decoration: underline;
            white-space: nowrap; /* Prevent text from wrapping to a new line */
            margin-top: 20px; /* Adjust as needed */
            vertical-align: middle; /* Align the button with the text */
            
          }
          
        `}
      </style>
    </Container>
  )
}