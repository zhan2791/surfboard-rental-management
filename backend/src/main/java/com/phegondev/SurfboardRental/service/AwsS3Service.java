//package com.phegondev.PhegonHotel.service;
//
//
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.regions.Regions;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import com.phegondev.PhegonHotel.exception.OurException;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.InputStream;
//
//@Service
//public class AwsS3Service {
//
//    //    private final String bucketName = "phegon-hotel-images";
//    private final String bucketName = "phegon-hotel-mongo";
//
//    @Value("${aws.s3.access.key}")
//    private String awsS3AccessKey;
//
//    @Value("${aws.s3.secret.key}")
//    private String awsS3SecretKey;
//
//    public String saveImageToS3(MultipartFile photo) {
//        String s3LocationImage = null;
//
//        try {
//
//            String s3Filename = photo.getOriginalFilename();
//
//            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
//            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
//                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
//                    .withRegion(Regions.US_EAST_2)
//                    .build();
//
//            InputStream inputStream = photo.getInputStream();
//
//            ObjectMetadata metadata = new ObjectMetadata();
//            metadata.setContentType("image/jpeg");
//
//            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3Filename, inputStream, metadata);
//            s3Client.putObject(putObjectRequest);
//            return "https://" + bucketName + ".s3.amazonaws.com/" + s3Filename;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new OurException("Unable to upload image to s3 bucket" + e.getMessage());
//        }
//    }
//}
//
//
//
//
package com.phegondev.SurfboardRental.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AwsS3Service {

    // 这是一个“假的”S3服务
    // 只要前端发来图片，就假装存好，返回一个固定的网上图片链接
    public String saveImageToS3(MultipartFile photo) {
        // 这里随便放一个好看的冲浪板图片链接
        return "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3";
    }

    // 假装删除
    public void deleteImageFromS3(String imageUrl) {
        // 什么都不做，控制台打印一下
        System.out.println("Mocking delete image: " + imageUrl);
    }
}