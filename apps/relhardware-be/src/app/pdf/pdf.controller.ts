import { Body, Controller, Header, Post, Req, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { Response } from 'express';

@Controller('pdf')
@ApiBearerAuth()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @Header('Content-Type', 'application/pdf')
  create(
    @Req() request: Request,
    @Body() createPdfDto: CreatePdfDto,
    @Res() response: Response
  ) {
    return this.pdfService.create(createPdfDto, request['user'], response);
  }

  // @Get('generate')
  // async generatePdf(
  //   @Res() res: Response,
  //   @Query() query: { title?: string; version?: string; place?: string }
  // ) {
  //   const pdfData = {
  //     logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=', // Inserire il logo base64 o un URL valido
  //     title: query.title || 'Assegnazione Sistemi Informatici Aziendali',
  //     version: query.version || 'Rev. 01 - 2025',
  //     description:
  //       "Questo documento rappresenta l'assegnazione dei dispositivi aziendali a Giorgio Privitera.",
  //     table: [
  //       {
  //         Tipo: 'PC',
  //         Modello: 'Macbook Pro A2141',
  //         ServiceTag: 'C02G4A2SMD6R',
  //       },
  //       {
  //         Tipo: 'Mouse',
  //         Modello: 'Logitech MX Master 3',
  //         ServiceTag: 'MX123456',
  //       },
  //     ],
  //     place: query.place || 'Sesto San Giovanni',
  //   };
  //
  //   await this.pdfService.generateDynamicPdf(pdfData, res);
  // }
}
