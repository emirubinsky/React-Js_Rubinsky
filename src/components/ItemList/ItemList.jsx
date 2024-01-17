import ItemCard from "../ItemCard/ItemCard";

// INFO - categoryLabel en esta FakeApi de la que depende es ya el nombre.
// En una iteracion mas habria que obtener el nombre.
const ItemList = ({ productos, categoryLabel = null }) => {
  return (
    <section className="container m-auto mt-8">
      {/* <CategoryNavbar /> */}

      <h2 className="text-4xl font-bold">
        Products {categoryLabel ? `- ${categoryLabel}` : ""}
      </h2>

      <hr />
      <br></br>

      <div className="flex flex-wrap justify-start gap-10 items-stretch">
        {productos.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemList;
