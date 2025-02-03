export default function DocsPage({params}:{params:{slug:string[]}}) {
    const {slug} = params
    console.log(slug);
    return (
      <div>
        {slug?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
}