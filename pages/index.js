import Head from 'next/head';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div className="container">
      <main>
        <div style={{ margin: '100px' }}>
          <Link rel="icon" href="/merchant/signUp">
            <a>
              <Button variant="contained" color="primary">
                Click to navigate to merchant SignUp page
              </Button>
            </a>
          </Link>
        </div>
        <div>
          <div style={{ margin: '100px' }}>
            <Link rel="icon" href="/merchant/login">
              <a>
                <Button variant="outlined" color="primary">
                  Click to navigate to merchant login
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ margin: '100px' }}>
            <Link rel="icon" href="/merchant/profile">
              <a>
                <Button variant="contained" color="primary">
                  Click to navigate to merchant profile
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ margin: '100px' }}>
            <Link rel="icon" href="/merchant/businessProfile">
              <a>
                <Button variant="outlined" color="primary">
                  Click to navigate to merchant business profile
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
