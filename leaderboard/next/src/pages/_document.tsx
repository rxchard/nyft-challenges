import Document, { Html, Head, Main, NextScript } from 'next/document'

class Base extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Grandstander:wght@700&family=Signika:wght@300;400&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Base
