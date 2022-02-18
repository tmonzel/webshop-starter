import { Express } from 'express';
import { ResourceController } from './controller';

export const createResourceFromController = (api: Express, controller: ResourceController) => {
    api.get("/" + controller.resourceName, controller.uses ? controller.uses : [], controller.index);

    if(controller.pick) {
        api.get("/" + controller.resourceName + '/:id', controller.uses ? controller.uses : [], controller.pick);
    }

    if(controller.create) {
        api.post("/" + controller.resourceName, controller.uses ? controller.uses : [], controller.create);
    }

    if(controller.update) {
        api.patch("/" + controller.resourceName + '/:id', controller.uses ? controller.uses : [], controller.update);
    }
}
