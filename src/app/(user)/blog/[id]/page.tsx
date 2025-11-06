import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { AppAlert } from "@/components/view/user/reuse";
import { PlaceholderImg } from "@/lib";

export default function Blog() {
  return (
    <div className="container pt-5">
      <BackBtn2 className="mb-2" />
      <ImgBox
        src={PlaceholderImg(1000, 1000)}
        className="h-60 lg:h-100 w-full  rounded-lg bg-muted overflow-hidden"
        alt={"title"}
      />
      <div className="py-4 px-3">
        <span className="text-sm text-article pb-5">June 30, 2025</span>
        <div className="space-y-1">
          <h3 className="text-2xl py-1 font-semibold  text-foreground">
            Music & Wellness Retreat
          </h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic veniam
            rem porro? Sint consectetur beatae aut animi reiciendis neque, magni
            sapiente, laudantium hic labore provident molestiae harum sed quidem
            explicabo incidunt laboriosam corrupti repudiandae fugiat recusandae
            asperiores, placeat cum? Minima, ea dolorem. Minus dolorum
            reiciendis veritatis non sunt, necessitatibus ullam saepe cumque
            repudiandae ipsa, fugiat in dignissimos debitis doloremque ad
            tenetur! Vero debitis possimus fugit, quaerat quis, optio impedit
            corrupti, neque nesciunt ab architecto repellendus dolorum velit ad
            similique pariatur culpa magnam ut officiis. Possimus natus eaque
            nesciunt voluptates quis accusamus nemo eius neque aliquid vitae
            rerum enim ut beatae adipisci asperiores minus quas culpa dolor
            molestias facilis et sit, impedit fugit commodi. Adipisci enim
            eligendi veniam magni saepe, dolorem dolor, voluptatem doloremque
            earum ullam consequatur reiciendis voluptates optio delectus
            voluptas dolore soluta deleniti, possimus dolores aut laborum odit?
            Labore aspernatur pariatur itaque, quisquam esse minus nostrum,
            repudiandae consectetur voluptatum dolores quidem quaerat obcaecati
            fuga tempore animi delectus vero mollitia? Sed odit quas distinctio
            suscipit ipsa, corporis cum, explicabo voluptate laboriosam expedita
            sunt eius doloribus velit soluta fugit vitae laborum veritatis
            sapiente itaque architecto nemo totam! Eveniet nihil eligendi quidem
            ullam recusandae hic. Laborum unde perferendis earum delectus magni
            architecto iure accusantium! Quam, porro quasi recusandae aperiam
            unde fuga esse a veritatis, itaque exercitationem dolorum doloremque
            molestias quisquam placeat? Dolorem omnis officiis quidem accusamus
            ut officia, cupiditate, tempore vero veniam quaerat nulla nisi quod
            quas. Perferendis eveniet laborum in aliquam? Nam neque inventore
            quidem ad, porro quam molestiae eum, itaque illum sapiente accusamus
            cum provident quis odit eveniet enim. Repudiandae nihil ab non
            expedita placeat magnam! A, sint saepe repellat molestias iusto
            numquam veniam ratione quasi alias laboriosam voluptatum velit esse
            impedit id inventore dicta minima illum quisquam illo totam debitis
            voluptates voluptas delectus culpa. Optio facere eaque
            necessitatibus adipisci.
          </p>
        </div>
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
