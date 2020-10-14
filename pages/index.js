import Head from 'next/head';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { login } from './../services/merchantSigninService';
export default function Home() {
  return (
    <div className="container">
      <main>
        <div style ={{margin : "100px"}}>
          <Link rel="icon" href="/merchant/signUp">
            <a>
              <Button variant="contained" color="primary">
                Click to navigate to merchant SignUp page
              </Button>
            </a>
          </Link>
        </div>
        <div>
          <div style ={{margin : "100px"}}>
            <Link rel="icon" href="/merchant/login">
              <a>
                <Button variant="outlined" color="primary">
                  Click to navigate to merchant login
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
