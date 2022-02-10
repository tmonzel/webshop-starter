import { Express } from 'express';
import { ResourceController } from './controller';

export const createResourceFromController = <T>(api: Express, controller: ResourceController) => {
    api.get("/" + controller.resourceName, controller.uses ? controller.uses : [], controller.index);

    if(controller.pick) {
        api.get("/" + controller.resourceName + '/:id', controller.uses ? controller.uses : [], controller.pick);
    }
}
