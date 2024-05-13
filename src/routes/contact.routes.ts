import { Router } from 'express';
import { createContact, deleteAllContact, deleteOneContact, findAllContact, findOneContact, updateContact } from '../controllers/contact.controller';
const router = Router();

router.route('/')
      .get(findAllContact)
      .post(createContact)
      .delete(deleteAllContact);

router.route('/byid/:id')
      .get(findOneContact)
      .delete(deleteOneContact)
      .put(updateContact);

export default router;