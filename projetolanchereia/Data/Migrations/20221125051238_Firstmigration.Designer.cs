﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using projetoLancheriaBackend.Data;

#nullable disable

namespace projetoLancheriaBackend.Data.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20221125051238_Firstmigration")]
    partial class Firstmigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("projetoLancheriaBackend.Models.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("projetoLancheriaBackend.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("PurchaseId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PurchaseId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("projetoLancheriaBackend.Models.Purchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Purchases");
                });

            modelBuilder.Entity("projetoLancheriaBackend.Models.Product", b =>
                {
                    b.HasOne("projetoLancheriaBackend.Models.Purchase", null)
                        .WithMany("Products")
                        .HasForeignKey("PurchaseId");

                    b.OwnsMany("projetoLancheriaBackend.Models.Material", "Materials", b1 =>
                        {
                            b1.Property<int>("ProductId")
                                .HasColumnType("INTEGER");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("INTEGER");

                            b1.Property<int>("IngredientId")
                                .HasColumnType("INTEGER");

                            b1.Property<int>("Quantity")
                                .HasColumnType("INTEGER");

                            b1.HasKey("ProductId", "Id");

                            b1.HasIndex("IngredientId");

                            b1.ToTable("Material");

                            b1.HasOne("projetoLancheriaBackend.Models.Ingredient", "Ingredient")
                                .WithMany()
                                .HasForeignKey("IngredientId")
                                .OnDelete(DeleteBehavior.Cascade)
                                .IsRequired();

                            b1.WithOwner()
                                .HasForeignKey("ProductId");

                            b1.Navigation("Ingredient");
                        });

                    b.Navigation("Materials");
                });

            modelBuilder.Entity("projetoLancheriaBackend.Models.Purchase", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
