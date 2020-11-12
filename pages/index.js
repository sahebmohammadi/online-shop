import Head from 'next/head';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div className="container">
      <main style={{ margin: '20px' }}>
        <span style={{ margin: '10px' }}>
          <Link rel="icon" href="/merchant/login">
            <a>
              <Button variant="outlined" color="primary">
                پنل کسب و کار
              </Button>
            </a>
          </Link>
        </span>
        <span style={{ margin: '10px' }}>
          <Link rel="icon" href="/admin/login">
            <a>
              <Button variant="outlined" color="primary">
                پنل مدیریت
              </Button>
            </a>
          </Link>
        </span>
      </main>
    </div>
  );
}
