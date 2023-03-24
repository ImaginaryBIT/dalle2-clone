terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "dalle2_clone_rg" {
  name     = "dalle2-clone-group"
  location = "East US"
}

resource "azurerm_storage_account" "dalle2_clone_storage" {
  name                     = "dalle2clonestorage"
  resource_group_name      = azurerm_resource_group.dalle2_clone_rg.name
  location                 = azurerm_resource_group.dalle2_clone_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "dalle2_clone_asp" {
  name                = "dalle2-clone-aps"
  location            = azurerm_resource_group.dalle2_clone_rg.location
  resource_group_name = azurerm_resource_group.dalle2_clone_rg.name

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_function_app" "dalle2_clone_app" {
  name                       = "dalle2-clone-app"
  location                   = azurerm_resource_group.dalle2_clone_rg.location
  resource_group_name        = azurerm_resource_group.dalle2_clone_rg.name
  app_service_plan_id        = azurerm_app_service_plan.dalle2_clone_asp.id
  storage_account_name       = azurerm_storage_account.dalle2_clone_storage.name
  storage_account_access_key = azurerm_storage_account.dalle2_clone_storage.primary_access_key
}
