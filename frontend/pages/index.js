import Head from 'next/head'
import { 
  PageContainer,
  LeftPanelContainer,
  MainPanelContainer,
  RightPanelContainer,
} from '@components/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Anteater Pathway</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <LeftPanelContainer>
          Left Panel
        </LeftPanelContainer>
        <MainPanelContainer>
          Main Panel
        </MainPanelContainer>
        <RightPanelContainer>
          Right Panel
        </RightPanelContainer>
      </PageContainer>
    </>



  )
}
