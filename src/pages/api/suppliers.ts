import type { NextApiRequest, NextApiResponse } from 'next'

// generate the data structures 
interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  zipcode: string;
}
interface Supplier {
  email: string;
  logo: {
    data: string;
    type: string;
  };
  address: Address;
}

// simulated because no frontend code right now
const createSupplier = async (supplier: Supplier) => {
  // simulate creating a new supplier in the database
  return {
    ...supplier,
  };
};

const handler = async (
  req: NextApiRequest, 
  res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, address }: Supplier = req.body;
      const logo = {
        data: Buffer.from(req.body.logo.data).toString('base64'),
        type: req.body.logo.type === 'image/jpeg' ? '.jpg' : '.png',
      };
      const newSupplier = await createSupplier({ email, logo, address });
      console.log(newSupplier);
      res.status(200).json(newSupplier);
    } 
    catch (error) {
      res.status(500).json({error: "Internal server error"});
    }
  } 
  else {
    // set the HTTP response status to 404 (not found)
    res.status(404);
    // send an error message as JSON in the response body
    res.json({ message: "Endpoint not found" });
  }
}


// export the request handler
export default handler;