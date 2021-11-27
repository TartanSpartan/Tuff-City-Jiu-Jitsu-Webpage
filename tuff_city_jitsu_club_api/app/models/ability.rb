# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
      user ||= User.new # guest user (not logged in)
      alias_action :create, :read, :update, :destroy, to: :crud


      # if user.has_role? :admin
      # Alternative:
      if user.is_admin?

        # can :manage, :all
        can :crud, :all
      # elsif user.is_instructor?
      #   can :crud, :technique
      else
        can :read, :technique
      end

      # Need to confine these permissions so that user can read up to the next grade from their's, and instructor is the same, but can still manage other things
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end