import { Controller, Post, Body, Get, Put, Param, UseInterceptors ,Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';


@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() body: any) {
        return this.productService.create(body);
    }

    @Get()
    findAll(@Query('category') category?:string) {
          if (category) {
            return this.productService.findByCategory(category);
        }
        return this.productService.findAll();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.productService.update(id, body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findById(id);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqName = uuidv4() + path.extname(file.originalname);
                    cb(null, uniqName);
                }
            })
        })
    )
    async uploadProduct(
        @Body() body: any,
        @UploadedFile() file: any
    ) {
        const product = {
            name: body.name,
            price: parseFloat(body.price),
            stock: parseInt(body.stock),
            seller: body.seller,
            category: body.category,
            description: body.description,
            photo: file.filename
        };

        return this.productService.create(product);
    }
    
    
}
