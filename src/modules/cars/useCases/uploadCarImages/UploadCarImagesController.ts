import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map(({ filename }) => filename);

    await uploadCarImagesUseCase.execute({ carId: id, imagesName: fileNames });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
