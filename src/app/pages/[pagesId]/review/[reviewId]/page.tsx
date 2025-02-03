export default async function PageReview({params}:{params:{pagesId:string, reviewId:string}}) {
    const {pagesId, reviewId} = params;
    return (
        <div>
            <h1>{pagesId}</h1>
            <h1>{reviewId}</h1>
        </div>
    )
}