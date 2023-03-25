terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.49.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "dalle2_clone_rg" {
  name     = "dalle2-clone-rg"
  location = "East US"
}

resource "azurerm_storage_account" "dalle2_clone_storage" {
  name                     = "dalle2clonestorage"
  resource_group_name      = azurerm_resource_group.dalle2_clone_rg.name
  location                 = azurerm_resource_group.dalle2_clone_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "dalle2_clone_sp" {
  name                = "dalle2-clone-sp"
  location            = azurerm_resource_group.dalle2_clone_rg.location
  resource_group_name = azurerm_resource_group.dalle2_clone_rg.name
  os_type             = "Linux"
  sku_name            = "Y1"
}

resource "azurerm_linux_function_app" "dalle2_clone_lfa" {
  name                       = "dalle2-clone-lfa"
  location                   = azurerm_resource_group.dalle2_clone_rg.location
  resource_group_name        = azurerm_resource_group.dalle2_clone_rg.name
  service_plan_id            = azurerm_service_plan.dalle2_clone_sp.id
  storage_account_name       = azurerm_storage_account.dalle2_clone_storage.name
  storage_account_access_key = azurerm_storage_account.dalle2_clone_storage.primary_access_key

  site_config {
    application_stack {
      node_version = "18"
    }
  }
}
