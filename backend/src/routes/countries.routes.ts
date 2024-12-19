import { Router } from 'express';
import { countriesController } from '../controllers/countries.controller';

const router = Router();

router.get('/', countriesController.getCountries);
router.get('/:countryCode', countriesController.getCountryInfo);

export default router;