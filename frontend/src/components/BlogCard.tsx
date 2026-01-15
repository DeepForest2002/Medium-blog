type CardComponents = {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
};

export const BlogCard = ({
  authorName,
  publishedDate,
  title,
  content,
}: CardComponents) => {
  return (
    <div>
      <div className="flex flex-col gap-2 m-4 justify-center">
        <div className="flex flex-row gap-3">
          <Avatar name={authorName} /> {authorName} . {publishedDate}
        </div>
        <div className="font-bold text-2xl">{title}</div>
        <div>{content.slice(0, 100) + "..."}</div>
      </div>
      <div className="h-1 w-screen bg-gray-200"></div>
    </div>
  );
};

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-neutral-tertiary rounded-full border-2 border-black bg-gray-300">
      <span className="font-medium text-body">{name[0]}</span>
    </div>
  );
}
