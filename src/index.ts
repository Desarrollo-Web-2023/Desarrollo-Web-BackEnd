import { config } from './config/config';
import { createApp } from './app';

createApp().listen(config.port, () => {
  console.log(`Corriendo en el puerto ${config.port}`);
});
