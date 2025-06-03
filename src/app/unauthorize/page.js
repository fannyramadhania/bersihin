"use client"

import { Button, Result } from "antd"
import { useRouter } from "next/navigation"

const PageAuthorized = () => {
    const router = useRouter()
    return (
        <Result
        status="403"
        title="403"
        subTitle="Maaf , anda tidak diizinkan mengakses halaman ini"
            extra={<Button type="primary"
                onClick={() => {
                    router.push("/")
                }}
            >Kembali</Button>}
      />
    )
   
}

export default PageAuthorized