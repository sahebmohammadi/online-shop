import Head from 'next/head';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div className="container">
      <main>
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
            <Link rel="icon" href="/admin/login">
              <a>
                <Button variant="outlined" color="primary">
                  Click to navigate to admin login
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
