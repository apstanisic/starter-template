import * as React from 'react';
import Link from 'next/link';
import { Grid, List, ListItem } from '@material-ui/core';

export default function AppFooter() {
  const firstRow = [
    { url: '/contact', text: 'Kontakt' },
    { url: '/tos', text: 'Uslovi koriscenja' },
    { url: '/privacy-policy', text: 'Polisa privatnosti' },
  ];
  return (
    <footer className="bg-gray-900">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <List>
            {firstRow.map((item, i) => (
              <ListItem key={i}>
                <Link href={item.url}>
                  <a className="text-white">{item.text}</a>
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <p className="text-white">Copyright {new Date().getFullYear()}</p>
            </ListItem>
            <ListItem>
              <a
                rel="noopener noreferrer"
                className="text-white"
                target="_blank"
                href="https://aleksandarstanisic.com"
              >
                Created by AStanisic
              </a>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </footer>
    // <footer className="w-screen text-white py-3 relative max-w-full bg-gray-900 text-center flex flex-wrap">
    //   <div className="container mx-auto flex flex-wrap max-w-xl">
    //     <div className="w-full md:w-1/2">
    //       <div className="my-4">
    //         <Link href="/kontakt">
    //           <a className="text-white">Kontakt</a>
    //         </Link>
    //       </div>
    //       <div className="my-4">
    //         <Link href="tos">Uslovi koriscenja</Link>
    //       </div>
    //       <Link href="/privacy-policy">
    //         <a className="my-4">Polisa privatnosti</a>
    //       </Link>
    //     </div>
    //     <div className="w-full md:w-1/2">
    //       <p className="my-4 ">Copyright {new Date().getFullYear()}</p>
    //       <div className="my-4 ">
    //         <a rel="noopener noreferrer" target="_blank" href="https://aleksandarstanisic.com">
    //           Created by AStanisic
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}
