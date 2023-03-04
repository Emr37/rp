import type { NextPage } from "next"
import Head from "next/head"
import { CreateQR } from "../components/CreateQR"
import Checkout from "@/components/CheckOut"


const CreateQRPage: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Create QR</title>
        <meta name="description" content="Creates QR for tables" />
      </Head>
      <CreateQR />
      <Checkout/>
    </div>
  )
}

export default CreateQRPage;