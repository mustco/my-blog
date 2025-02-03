export default async function Page({params}:{params:{pagesId:string}}) {
    const {pagesId} = params;
    console.log(params.pagesId)
    return (
        <div>
            <h1>{pagesId}</h1>
        </div>
    )
}
