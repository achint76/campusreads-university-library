// import React from "react";
// import Link from "next/link";
// import { Book } from "@/types";
// import BookCover from "@/components/BookCover";

// const BookCard = ({ id, title, author, genre, color, cover }: Book) => {
//   return (
//     <Link href={`/books/${id}`}>
//       <article className="group w-fit">
//         <BookCover
//           variant="default"
//           coverColor={color}
//           coverImage={cover}
//           className="group-hover:scale-105"
//         />

//         <div className="mt-4">
//           <h3 className="book-title">{title}</h3>
//           <p className="book-genre">
//             By {author} • {genre}
//           </p>
//         </div>
//       </article>
//     </Link>
//   );
// };

// export default BookCard; 


import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/books/${id}`}
      className={cn(isLoanedBook && "w-full flex flex-col items-center")}
    >
      <BookCover coverColor={color} coverImage={cover} />

      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">11 days left to return</p>
          </div>

          <Button className="book-btn">Download Receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;